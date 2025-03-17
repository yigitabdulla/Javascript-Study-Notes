import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { updateTask } from '../redux/slices/planSlice'
import LinearProgress from '@mui/material/LinearProgress';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const plans = useSelector(store => store.plan?.weeklyPlan || []);
    
    const dispatch = useDispatch();

    const handleActions = (taskAction,taskId,id) => {
        dispatch(updateTask({taskAction: taskAction, taskId: taskId, id: id}))
        console.log(plans)
    }

    const calculateProgress =  () => {
        let totalCompleted = row.tasks.reduce((acc,item) => {
            if(item.completed == true) {
                acc += 1
            }
            return acc
        },0)


        return (totalCompleted/row.tasks.length) * 100
    }

    

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.day}</TableCell>
                <TableCell>{row.tasks.length}</TableCell>
                <TableCell><LinearProgress variant="determinate" value={calculateProgress()} /></TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tasks
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Task</TableCell>
                                        <TableCell>Is completed?</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.tasks.map((task) => (
                                        <TableRow key={task.task}>
                                            <TableCell component="th" scope="row">
                                                {task.taskId}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {task.time}
                                            </TableCell>
                                            <TableCell>{task.task}</TableCell>
                                            <TableCell>{task.completed ? "Completed" : "Not completed"}</TableCell>
                                            <TableCell sx={{display:'flex', gap:'10px'}}>
                                                <CheckCircleOutlineIcon onClick={() => handleActions("complete", task.taskId, row.id)} sx={{cursor:'pointer', color:'green'}}/>
                                                <DoNotDisturbIcon onClick={() =>handleActions("notcomplete", task.taskId, row.id)} sx={{cursor:'pointer', color:'orange'}}/>
                                                <RemoveCircleOutlineIcon onClick={() => handleActions("remove", task.taskId, row.id)} sx={{cursor:'pointer', color:'tomato'}}/>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

export default function CollapsibleTable() {


    const plans = useSelector(store => store.plan?.weeklyPlan || []);

    return (
        <TableContainer component={Paper} sx={{width:'80%'}}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Date</TableCell>
                        <TableCell>Day</TableCell>
                        <TableCell>Total Tasks</TableCell>
                        <TableCell>Progress</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {plans.map((plan,idx) => (
                        <Row key={idx} row={plan} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
