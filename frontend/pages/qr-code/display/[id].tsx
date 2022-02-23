import React from "react";
import {useRouter} from "next/router";
import {getQrCodeById, getQrCodes} from "strapi-api/query/qr-codes";
import {Warehouse} from "strapi-api/warehouse/warehouse";

import QRCode from "react-qr-code";
import {QrCode} from "strapi-api/entity/qr-code/qr-code";
import {domain, protocol, qrCodeUrlPart} from "../../../constants";

export default function Index(props) {

    Warehouse.get().hydrate(props.warehouse);
    const router = useRouter()

    const id = parseInt(router.query.id as string, 10);

    const qrCode = Warehouse.get().getQrCode(
        id
    );

    const url = `${protocol}${domain}/${qrCodeUrlPart}/${id}`

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

    await getQrCodeById(id);

    return {
        props: {
            warehouse: Warehouse.get().dehydrate()
        }
    }
}


export async function getStaticPaths() {

    const qrCodes = await getQrCodes();

    let idPaths = qrCodes.map((qrCode:QrCode)=>{
        return {
            params:{
                id: qrCode.id + ''
            }
        }
    });

    return {
        paths: idPaths,
        fallback: false,
    };
}
