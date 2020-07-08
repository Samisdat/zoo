import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
const slugify = require('@sindresorhus/slugify');

export default class EnclosureForm extends React.Component {
    state = {
        formData: {
            id: this.props.active.id,
            name: this.props.active.name,
            slug: slugify(this.props.active.name),
        },
        submitted: false,
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = () => {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }

    render() {


        const { formData, submitted } = this.state;

        console.log(formData)

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