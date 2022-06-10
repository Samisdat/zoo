import React from 'react';
import {useRouter} from 'next/router';

import QRCode from 'react-qr-code';
import {domain, protocol, qrCodeUrlPart} from '../../../constants';
import {Warehouse} from "../../../data/warehouse/warehouse";
import {fetchQrCodeById, fetchQrCodes} from "../../../data/graphql/qr-codes";
import {QrCode} from "../../../data/graphql/qr-code/qr-code";

export default function Index(props) {

    Warehouse.get().hydrate(props.warehouse);
    const router = useRouter()

    const id = parseInt(router.query.id as string, 10);

    const qrCode = Warehouse.get().getQrCode(
        id
    );

    const url = `${protocol}${domain}/${qrCodeUrlPart}/scan/${id}`

    return (
        <div>
            <QRCode value={url} level={'L'} size={500}/>

            <p>{qrCode.id}</p>
            <p>{qrCode.title}</p>
            <p>{qrCode.lat}</p>
            <p>{qrCode.lng}</p>
            <p>{qrCode.facility?.title}</p>
            <p>{qrCode.animal?.title}</p>
        </div>

    );
}

export async function getStaticProps(context) {

    const id = context.params.id

    await fetchQrCodeById(id);

    return {
        props: {
            warehouse: Warehouse.get().dehydrate()
        }
    }
}


export async function getStaticPaths() {

    const qrCodes = await fetchQrCodes();

    const paths = qrCodes.map((qrCode:QrCode)=>{
        return {
            params:{
                id: qrCode.id + ''
            }
        }
    });

    return {
        paths,
        fallback: false,
    };
}
