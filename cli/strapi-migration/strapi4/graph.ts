import axios from "axios";
import {getUrl_4} from "./get-url";
import {getHeaders} from "./get-header";
import {Facility_3} from "../strapi3/facility";
import {Facility_4} from "./facility";

const qs = require('qs');

export interface Edge_4{
    id: number;
    attributes:{
        IdFromSvg: string;
        d: string;
        edgeLength: number;
        graph_node_start: number;
        graph_node_end: number;
        created_at: string;
        updated_at: string;
    }
}

export interface Node_4{
    id: number;
    attributes: {
        IdFromEdges: string;
        x: number;
        y: number;
        facility: Facility_4 | null;
        created_at: string;
        updated_at: string;
        graph_edges_starts: Edge_4[];
        graph_edges_ends: Edge_4[];
    }
}


export const getEdges_4 = async ():Promise<Edge_4[]> => {

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
        populate:'*'
    }, {
        encodeValuesOnly: true, // prettify url
    });


    const url = getUrl_4(`/api/graph-edges?${query}`);

    const response = await axios.get(
        url,
        getHeaders()
    );

    return (response.data.data as Edge_4[]);

};

export const getNodes_4 = async ():Promise<Node_4[]> => {

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
        populate:'*'
    }, {
        encodeValuesOnly: true, // prettify url
    });


    const url = getUrl_4(`/api/graph-nodes?${query}`);

    const response = await axios.get(
        url,
        getHeaders()
    );

    return (response.data.data as Node_4[]);

};