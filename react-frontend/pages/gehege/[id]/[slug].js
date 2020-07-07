import { useRouter } from 'next/router'

const Gehege = () => {
    const router = useRouter()
    const { slug } = router.query

    return <p>Gehege: {slug}</p>
}

export async function getStaticProps({ params, preview = false, previewData }) {

    console.log('params', params)

    const res = await fetch('http://127.0.0.1:3000/polygon/enclosure')
    let enclosures = await res.json();

    return {
        props: {
            slug:enclosures[0].id,
            id:enclosures[0].name
        },
    }
}
export async function getStaticPaths() {

    const res = await fetch('http://127.0.0.1:3000/polygon/enclosure')
    let enclosures = await res.json();
    
    const paths = enclosures.map((enclosure)=>{
        return {
            params: {
                id: enclosure.id,
                slug: enclosure.name
            }
        };
    });

    console.log(paths)

    /*
    enclosures = enclosures.map((enclosure)=>{
        return{
            id: enclosure.id,
            name: enclosure.name
        };
    });


    /*
    paths: [
        { params: { id: '1' } },
        { params: { id: '2' } }
    ],
        fallback: ...
    */

    return {
        paths: paths,
        fallback: false
    };
}

export default Gehege