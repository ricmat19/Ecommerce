import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import CollectionAPI from '../apis/collectionAPI';
import {CollectionContext} from '../context/collectionContext';

const CollectionC = (props) => {

    const {product} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);
    console.log(product);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await CollectionAPI.get(`/collection/${product}`);
                setCollection(response.data.data.collection);
                console.log(response.data.data.collection);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    return(
        <div>
            <div className="main-body">
                <div className="center subtitle-div">
                    <a className="subtitle-anchor" href="/collection/comic"><h1 className="subtitle">COMICS</h1></a>
                    <a className="subtitle-anchor" href="/collection/print"><h1 className="subtitle">PRINTS</h1></a>
                    <a className="subtitle-anchor" href="/collection/personal-work"><h1 className="subtitle">PERSONAL</h1></a>
                </div>
                <div className="collection-menu">
                    {collection && collection.map(item => {
                        return(
                            <div key={item.id}>
                                <a href="/collection/comic">
                                    <div className="collection-item">
                                        <img className="collection-thumbnail" src="" alt="thumbnail"/>
                                    </div>
                                    <div className="collection-thumbnail-footer">
                                        <div className="Title">{item.title}</div>
                                        <div className="Price">{item.price}</div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default CollectionC;