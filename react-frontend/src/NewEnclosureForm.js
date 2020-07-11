import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default class EnclosureForm extends React.Component {
    state = {
        formData: {
            osmId: '',
            zooId: '',
            name: '',
            type: '',
        },
        submitted: false,
    }

    /*
    static getDerivedStateFromProps(nextProps, prevState) {


        if(nextProps.active.id === prevState.formData.id){
            return prevState;
        }

        return {
            formData: {
                osmId: '',
                zooId: '',
                name: '',
                type: '',
            },
            submitted: false,

        };
    }
    */

    handleChange = (event) => {
        const { formData } = this.state;


        formData[event.target.name] = event.target.value;
        this.setState({ formData });

        console.log(this.state)
    }

    handleSubmit = (event) => {

        this.setState({ submitted: true }, async () => {

            const data = new FormData(event.target);

            if('' === data.get('name')){
                data.delete('name');
            }


            const response = await fetch('http://127.0.0.1:3000/polygon/enclosure/import-osm', {
                method: 'POST',
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
                    label="osmId"
                    variant="outlined"
                    onChange={this.handleChange}
                    name="osmId"
                    value={formData.osmId}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <br />
                <TextValidator
                    label="zooId"
                    variant="outlined"
                    onChange={this.handleChange}
                    name="zooId"
                    value={formData.zooId}
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
                    errorMessages={['this field is required']}
                />
                <br />
                <br />
                <Select
                    label="Type"
                    name="type"
                    value={formData.type}
                    validators={['required']}
                    onChange={this.handleChange}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="building">building</MenuItem>
                    <MenuItem value="enclosure">enclosure</MenuItem>
                    <MenuItem value="playground">playground</MenuItem>
                    <MenuItem value="border">border</MenuItem>
                    <MenuItem value="way">way</MenuItem>
                    <MenuItem value="water">water</MenuItem>
                </Select>
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