import ProductContainer from "./Container";
import { Route, Routes } from 'react-router'
import CreateOrEdit from './CreateOrEdit'
import Constants from "../../Common/Contanst";


const Product = () => {
    const paths = [ Constants.CREATE_PATH, Constants.EDIT_PATH + '/:id']
    return (
        <>
            <ProductContainer />
            <Routes>
                {paths.map((p) => (
                    <Route
                        path={p}
                        Component={CreateOrEdit}
                    />
                ))}
            </Routes>
        </>
    )
}
export default Product;
