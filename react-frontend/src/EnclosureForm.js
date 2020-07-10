import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class EnclosureForm extends React.Component {
    state = {
        formData: {
            id: this.props.active.id,
            name: this.props.active.name,
            slug: this.props.active.slug,
        },
        submitted: false,
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if(nextProps.active.id === prevState.formData.id){
            return prevState;
        }

        return {
            formData: {
                id: nextProps.active.id,
                name: nextProps.active.name,
                slug: nextProps.active.slug,
            },
            submitted: false,

        };
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = (event) => {

        this.setState({ submitted: true }, async () => {

            const data = new FormData(event.target);

            console.log(data.getAll('name'))

            const response = await fetch('http://127.0.0.1:3000/polygon/' + this.state.formData.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.formData),
            });

            if (response.ok) { // if HTTP-status is 200-299
                               // get the response body (the method explained below)
                let json = await response.json();
                console.log('json', json);
                this.setState({ submitted: false });
            } else {
                console.log("HTTP-Error: " + response.status);
            }


        });


    }

    render() {

        const { formData, submitted } = this.state;

        const input = '# This is a header\n\nAnd this is a paragraph'


        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <h2>Simple form</h2>
                <TextValidator
                    disabled
                    label="Id"
                    variant="outlined"
                    onChange={this.handleChange}
                    name="id"
                    value={formData.id}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <br />
                <TextValidator
                    label="Slug"
                    variant="outlined"
                    onChange={this.handleChange}
                    name="slug"
                    value={formData.slug}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <br />
                <TextValidator
                    label="Name"
                    variant="outlined"
                    onChange={this.handleChange}
                    name="name"
                    value={formData.name}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <br />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={submitted}
                >
                    {
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Submit')
                    }
                </Button>
            </ValidatorForm>
        );
    }
}