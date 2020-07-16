import React from 'react';
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



export default class WayEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            nameStart: 'Foo',
            nameEnd: 'Bar',
            steps: true,
            points:[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        if('steps' === event.target.name){
            this.setState({steps: (true === this.state.steps) ? false: true});
        }
        else if('name-start' === event.target.name){
            this.setState({nameStart: event.target.value});
        }
        else if('name-end' === event.target.name){
            this.setState({nameEnd: event.target.value});
        }
        else
        {
            this.setState({value: event.target.value});
        }
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1>Karte</h1>
                </Grid>
                <Grid item xs={6}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup row style={{marginBottom:'10px'}}>
                            <TextField
                                name="name-start"
                                label="Name Start"
                                value={this.state.nameStart}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'10px'}}>
                            <TextField
                                name="name-end"
                                label="Name End"
                                value={this.state.nameEnd}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'10px'}}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="steps"
                                        checked={this.state.steps}
                                        onChange={this.handleChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                label="Treppen"
                            />
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'10px'}}>
                            <Button type="submit" variant="contained" color="primary">
                                Primary
                            </Button>
                        </FormGroup>
                        <h1>Segment</h1>
                        <ul>
                            <li>Name Start</li>
                            <li>Name End</li>
                            <li>Treppen</li>
                            <li>Node 1</li>
                            <li>Edge X</li>
                            <li>Edge Y</li>
                            <li>Edge Z</li>
                            <li>Node 2</li>
                        </ul>
                        <label>
                            Name:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>

                </Grid>
                <Grid item xs={6}>
                    <div style={{background:'red'}}>foo</div>
                </Grid>
            </Grid>
        );
    }
}
