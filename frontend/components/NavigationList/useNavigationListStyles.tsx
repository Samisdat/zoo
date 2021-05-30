import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useNavigationListStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            marginBottom: theme.spacing(2),
        },
        subheader: {
            backgroundColor: theme.palette.background.paper,
        },
    })
);