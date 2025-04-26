import React, { useState, useEffect } from 'react';
import users from '../data/users.json';
import '../styles/table.css';

export default function Table() {
    const dynamicColumns = Object.keys(users[0] || {});
    const [data, setData] = useState(users);
    const [filteredData, setFilteredData] = useState(users);
    const [search, setSearch] = useState({});
    const [globalSearch, setGlobalSearch] = useState('');
    const [visibleCols, setVisibleCols] = useState([...dynamicColumns]);
    const [columnOrder, setColumnOrder] = useState([...dynamicColumns]);
    const [colWidths, setColWidths] = useState(
        dynamicColumns.reduce((acc, col) => {
            acc[col] = 150;
            return acc;
        }, {})
    );
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [isResizing, setIsResizing] = useState(false);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Click once for asc, twice for desc, three times for default
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc';
            } else if (sortConfig.direction === 'desc') {
                setSortConfig({ key: null, direction: null });
                return;
            }
        }
        setSortConfig({ key, direction });
        setCurrentPage(1); // Reset to first page when sorting
    };

    const handleSearch = (col, val) => {
        setSearch(prev => ({ ...prev, [col]: val }));
        setCurrentPage(1); // Reset to first page when searching
    };

    useEffect(() => {
        let filtered = users.filter(user =>
            dynamicColumns.every(col =>
                String(user[col]).toLowerCase().includes((search[col] || '').toLowerCase())
            )
        );
        
        if (globalSearch.trim()) {
            filtered = filtered.filter(user =>
                dynamicColumns.some(col =>
                    String(user[col]).toLowerCase().includes(globalSearch.toLowerCase())
            ));
        }

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];

                // Handle different data types
                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
                }

                // String comparison
                const aStr = String(aVal).toLowerCase();
                const bStr = String(bVal).toLowerCase();
                
                if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setFilteredData(filtered);
        setData(filtered);
    }, [search, globalSearch, sortConfig]);

    // Pagination logic
    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const toggleColumn = col => {
        setVisibleCols(prev =>
            prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
        );
    };

    const onDragStart = (e, col) => {
        if (isResizing) {
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData('col', col);
    };

    const onDrop = (e, targetCol) => {
        const draggedCol = e.dataTransfer.getData('col');
        const newOrder = [...columnOrder];
        const fromIndex = newOrder.indexOf(draggedCol);
        const toIndex = newOrder.indexOf(targetCol);
        newOrder.splice(fromIndex, 1);
        newOrder.splice(toIndex, 0, draggedCol);
        setColumnOrder(newOrder);
    };

    const initResize = (e, col) => {
        e.preventDefault();
        setIsResizing(true);

        const startX = e.clientX;
        const startWidth = colWidths[col];

        const onMouseMove = (moveEvent) => {
            const newWidth = startWidth + (moveEvent.clientX - startX);
            setColWidths((prev) => ({
                ...prev,
                [col]: Math.max(50, newWidth),
            }));
        };

        const onMouseUp = () => {
            setIsResizing(false);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="table-container">
            <h1 className='title'>Kullanıcı Tablosu</h1>

            <div className="table-top">
                <input
                    className="global-search"
                    type="text"
                    placeholder="Genel arama..."
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                />

                <div className="column-selector">
                    <button className='selector-button' onClick={() => setShowColumnSelector(!showColumnSelector)}>
                        Sütun Seç
                    </button>
                    {showColumnSelector && (
                        <div className="dropdown">
                            {dynamicColumns.map(col => (
                                <label key={col} className='drowpdown-item'>
                                    <input
                                        className='dropdown-checkbox'
                                        type="checkbox"
                                        checked={visibleCols.includes(col)}
                                        onChange={() => toggleColumn(col)}
                                    />
                                    {col}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            {columnOrder.map(col =>
                                visibleCols.includes(col) ? (
                                    <th
                                        key={col}
                                        draggable={!isResizing}
                                        onDragStart={(e) => onDragStart(e, col)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => onDrop(e, col)}
                                        style={{ width: `${colWidths[col]}px`, position: 'relative' }}
                                        onClick={() => requestSort(col)}
                                    >
                                        <div className="th-content">
                                            {col[0].toUpperCase() + col.slice(1)}
                                            {sortConfig.key === col && (
                                                <span className="sort-indicator">
                                                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                                                </span>
                                            )}
                                        </div>

                                        <input
                                            className='header-inputs'
                                            type="text"
                                            placeholder={`Ara: ${col}`}
                                            value={search[col] || ''}
                                            onChange={(e) => handleSearch(col, e.target.value)}
                                        />

                                        <div
                                            onMouseDown={(e) => initResize(e, col)}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                width: '5px',
                                                height: '100%',
                                                cursor: 'col-resize',
                                                zIndex: 2,
                                            }}
                                        />
                                    </th>
                                ) : null
                            )}
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((row, i) => (
                            <tr key={i}>
                                {columnOrder.map(col =>
                                    visibleCols.includes(col) ? (
                                        <td key={col} style={{ width: `${colWidths[col]}px` }}>
                                            {row[col]}
                                        </td>
                                    ) : null
                                )}
                                <td>
                                    <button>Düzenle</button>
                                    <button>Sil</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? 'disabled' : ''}
                >
                    Önceki
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={currentPage === number ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
                
                <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? 'disabled' : ''}
                >
                    Sonraki
                </button>
            </div>

            {/* Items per page selector (optional) */}
            <div className="items-per-page">
                <span>Sayfa başına öğe: </span>
                <select 
                    value={itemsPerPage} 
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
}