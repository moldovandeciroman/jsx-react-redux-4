import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {createStream} from '../../actions'
class StreamCreate extends React.Component
{

    renderError =({touched, error}) =>
    {
        if(touched && error)
            return (<div className="ui error message">
                <div className ="header">{error}</div>
            </div>)
    }

    renderInput =({input, label, meta}) =>
    { 
        console.log(meta)
        return (
        <div className="field">
            <label>{label}</label>
            <input {...input} autoComplete="off"/>
            {this.renderError(meta)}
        </div>) 
    }

    onSubmit = (formValues) =>
    {
        this.props.createStream(formValues)
    }
    render()
    {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
           
                <Field name ="title" component={this.renderInput} label="Enter Title"/>
                <Field name ="description" component={this.renderInput} label="EnterDescription"/>
                <button className="ui button primary">Submit</button>
            </form>
      )
    }
    
}

const validate = (formValues) =>
{
    const errors = {};
    if(!formValues.title)
        errors.title = 'you must enter a title'

     if(!formValues.description)
        errors.description = 'you must enter a description'
    return errors
}

export default connect(null, {createStream})(reduxForm({
    form: 'streamCreate',
    validate:validate
})(StreamCreate));