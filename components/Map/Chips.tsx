import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

interface ChipData {
    key: number;
    label: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: 0,
        },
        chip: {
            margin: theme.spacing(0.5),
        },
    }),
);

export default function ChipsArray() {
    const classes = useStyles();
    const [chipData, setChipData] = React.useState<ChipData[]>([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);

    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <React.Fragment>
            {chipData.map((data) => {
                let icon;

                return (

                        <Chip
                            key={data.key}
                            icon={icon}
                            label={data.label}
                            onDelete={ handleDelete(data)}
                            className={classes.chip}
                        />

                );
            })}
        </React.Fragment>
    );
}
