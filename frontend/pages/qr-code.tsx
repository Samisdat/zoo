import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {ListItemLink} from "./anlagen";
import {qrCodeUrlPart} from "../constants";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {getQrCodes} from "../strapi-api/query/qr-codes";
import {QrCode} from "../strapi-api/entity/qr-code/qr-code";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export default function QrCodePage(props) {

    Warehouse.get().hydrate(props.warehouse);

    const qrCodes = Warehouse.get().getQrCodes();

  const classes = useStyles();

    return (
        <List className={classes.root}>
            {
                qrCodes.map( (qrCode:QrCode) => {
                    const href =  `/${qrCodeUrlPart}/${qrCode.id}`
                    return (
                        <ListItem key={qrCode.id}>
                            <ListItemLink href={href}>
                                {qrCode.title}<br/>
                            </ListItemLink>
                        </ListItem>
                    );
                })
            }
        </List>
    );
}



export async function getStaticProps({ params, preview = false, previewData }) {

    const qr = await getQrCodes();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }

}