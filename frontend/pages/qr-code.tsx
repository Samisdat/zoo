import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


import {ListItemLink} from './anlagen';
import {qrCodeUrlPart} from '../constants';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {fetchQrCodes} from "../graphql/qr-codes";
import {QrCode} from "../graphql/qr-code/qr-code";

export default function QrCodePage(props) {

    Warehouse.get().hydrate(props.warehouse);

    const qrCodes = Warehouse.get().getQrCodes();

    return (
        <List>
            {
                qrCodes.map( (qrCode:QrCode) => {
                    const href =  `/${qrCodeUrlPart}/display/${qrCode.id}`
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

    await fetchQrCodes();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }

}