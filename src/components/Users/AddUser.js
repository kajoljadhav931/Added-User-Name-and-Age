import React,{useState , useRef} from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUSer.module.css';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // const [enteredUsername, setEnteredUsername] = useState('');
    // const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();
 
    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if (enteredName.trim().length === 0 || enteredUserAge === 0){

            setError({
                title: 'Invalid input',
                message: 'Please Enter a valid name and age (non empty values).',
            });
            return;
        }
        if (+enteredUserAge < 1){
            setError({
                title: 'Invalid age',
                message: 'Please Enter a valid age (>0).',
            });
            return;
        }
        console.log(enteredName, enteredUserAge);
        props.onAddUser(enteredName, enteredUserAge);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
        // setEnteredUsername('');
        // setEnteredAge('');
    };

    // const usernameChangeHandler = (event) => {
    //     setEnteredUsername(event.target.value);
    // }

    // const ageChangeHandler = (event) => {
    //     setEnteredAge(event.target.value);
    // }

    const errorHandler = () => {
        setError(null);
    };
    return (
        <Wrapper>

        {error && (<ErrorModal 
        title={error.title} 
        message={error.message} 
        onConfirm={errorHandler}/>)}

        <Card className={classes.input}> 
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">UserName: </label>
            <input id="username" type="text" 
            ref = {nameInputRef} />
             {/* value={enteredUsername} 
            onChange={usernameChangeHandler}  */}
            <label htmlFor="age">Age (years)</label>
            <input id="age" type="number" 
            ref = {ageInputRef} />
            {/* value={enteredAge} 
            onChange={ageChangeHandler} */}
            <Button type="submit">Add User</Button>
        </form>
        </Card>
        </Wrapper>
    );
}

export default AddUser;