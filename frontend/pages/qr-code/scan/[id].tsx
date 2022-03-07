import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {getQrCodeById, getQrCodes} from "strapi-api/query/qr-codes";
import {Warehouse} from "strapi-api/warehouse/warehouse";
import {QrCode} from "strapi-api/entity/qr-code/qr-code";
import CircularProgress from '@mui/material/CircularProgress';
import {useViewport} from "components/viewport/useViewport";
import {PositionInterface   } from "components/Map/Context/MapContext";
import {setMarkerToStorage} from "components/Map/setMarkerToStorage";
import {styled} from "@mui/material/styles";

const Centered = styled('div')({
    position: 'absolute',
    top:0,
    left:0,
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export default function Index(props) {

    Warehouse.get().hydrate(props.warehouse);

    const router = useRouter()

    const {height} = useViewport();

    const id = parseInt(router.query.id as string, 10);

    const qrCode = Warehouse.get().getQrCode(
        id
    );

    const lat = parseFloat(qrCode.lat);
    const lng = parseFloat(qrCode.lng);

    useEffect(() => {

        const position: PositionInterface = {
            isGPS: false,
            isWithin: true,
            text: qrCode.title,
            lat,
            lng,

        };

        setMarkerToStorage(position);

        if(qrCode.facility){
            //router.push(`/anlagen/${qrCode.facility.slug}`);
        }
        else if (qrCode.animal){
            //router.push(`/tiere/${qrCode.animal.slug}`);
        }

    });

    return (
        <React.Fragment>
            <p>{qrCode.id}</p>
            <p>{qrCode.title}</p>
            <p>{lat}</p>
            <p>{lng}</p>
            <Centered
                style={{
                    height:height + 'px'
                }}
            >
                <CircularProgress />
            </Centered>

        </React.Fragment>

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
