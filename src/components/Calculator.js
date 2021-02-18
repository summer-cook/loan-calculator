import React, {useState} from 'react';
import { Col, Row, Form, Container, Button, Input} from 'reactstrap'

const Calculator = () => {

//state variables section
const [userValues, setUserValues] = useState({
        amount: '',
        interest: '',
        years: '',
        months: '',
        email: ''
      });

const [results, setResults] = useState({
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
        isResult: false,
    });

const [error, setError] = useState('');

const handleInputChange = (event) =>
  setUserValues({ ...userValues, [event.target.name]: event.target.value });

  const handleSubmitValues = (e) => {
    e.preventDefault();
        if (isValid()) {
      setError('');
      calculateResults(userValues);
    }
  };

  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);
 
    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (monthly * calculatedPayments - userAmount).toFixed(2);
 
      // Set up results to the state to be displayed to the user
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated ,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

const isValid = () => {
    const { amount, interest, years } = userValues;
    let actualError = '';
    // Validate if there are values
    if (!amount || !interest || !years) {
      actualError = 'All the values are required';
    }
    // Validate if the values are numbers
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      actualError = 'All the values must be a valid number';
    }
    // Validate if the values are positive numbers
    // if (
    //   Number(amount) <= 0 ||
    //   Number(interest) <= 0 ||
    //   Number(years) <= 0
    // ) {
    //   actualError = 'All the values must be a positive number';
    // }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

const clearFields = () => {
    setUserValues({
      amount: '',
      interest: '',
      years: '',
      months: ''
    });
 
    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  };

//extra payments section

const [extraPaymentsToggle, setExtraPaymentsToggle] = useState(false)

const extraPaymentsButton = (e) =>{
    e.preventDefault()
    if (extraPaymentsToggle === false) {
    setExtraPaymentsToggle(true)}
    else setExtraPaymentsToggle(false)
    console.log(extraPaymentsToggle)
}

   return (
    <Container className='calculator'>
        <Form className='form' onSubmit={handleSubmitValues}>
        <h1>Loan Calculator</h1>
            <Row className='column-container'>
            <Col className='form-items'>
            { error && <p className='error'>{error}</p> }
                <Container>
                <label className='label'>Amount:</label>
                <input
                    className='input'
                    type='text'
                    name='amount'
                    placeholder='Loan amount'
                    value={ userValues.amount }
                    onChange={ handleInputChange }
                />
                </Container>
                <Container>
                <label className='label'>Interest:</label>
                <input
                    className='input'
                    type='text'
                    name='interest'
                    placeholder='Interest'
                    value={ userValues.interest }
                    onChange={ handleInputChange }
                />
                </Container>
                <Container>
                <label className='label'>Years:</label>
                <input
                    className='input'
                    type='text'
                    name='years'
                    placeholder='Years'
                    value={ userValues.years || userValues.months && (userValues.months / 12).toFixed(3) }
                    onChange={ handleInputChange }
                />
                </Container>
                or
                <Container>
                <label className='label'>Months:</label>
                <input
                    className='input'
                    type='text'
                    name='months'
                    placeholder='Months'
                    value={ userValues.months || userValues.years && userValues.years * 12 }
                    onChange={ handleInputChange }
                />
                </Container>
                <input 
                    type='submit' 
                    className='button'
                    value='submit'/>
                </Col>
                <Col sm={8} className='form-items'>
                <div className='border-container'>
                <div>
                    <label className='label'>Monthly Payment:</label>
                    <h2> ${results.monthlyPayment} </h2>
                </div>
                <div className='payments-container'>
                    <div>
                    <label className='label'>Total<br/>Payment: </label>
                    <p>${results.totalPayment}</p>
                </div>
                <div>
                    <label className='label'>Total<br/>Interest:</label>
                    <p>${results.totalInterest}</p>
                </div>
                </div>
                </div> 
                <Input
                    className='button'
                    value='Reset'
                    type='button'
                    onClick={clearFields}
                    />
            </Col>
            </Row>  
            <Container className='extra-payments'>
                { !extraPaymentsToggle &&
                    <Button className='label' onClick={ extraPaymentsButton }>
                    Show More
                    </Button> }
                { extraPaymentsToggle &&
                <div>
                    <Button className='label hide-extra-payments-button' onClick={ extraPaymentsButton }>
                    Hide
                    </Button>
                <Container className='extra-payments-content'>
                    <Row className='extra-payments-item'>
                        <h3>
                            Paying off a loan can help you build credit and set you up for more financial stability in the future.
                        </h3>
                    </Row>
                    <Row className='column-container'>
                            <p>
                            Enter your email to get more information about affordable loan options through Fig.
                            </p>
                    </Row>
                    <Row>
                        <Input
                            className='input'
                            type='text'
                            name='email'
                            placeholder='Email'
                            value= {userValues.email}
                            onChange={ handleInputChange }
                        />
                    </Row>
                    <Row>
                        <Input
                            className='button'
                            value='Send'
                            type='button'
                        />
                    </Row>
                    </Container>
                </div>
                }
            </Container> 
        </Form>
    </Container>
   )
}

export default Calculator;