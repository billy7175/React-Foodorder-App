import { useState, useEffect } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import {Badge} from 'antd'
import { currencyFormatter } from "../../utils/helpers";

const SingleCourse = ({ course }) => {
    const router = useRouter();
    const { slug } = router.query
    const { name, description, instructor, updateAt, lessons, image, price, paid, category } = course

    return (
        <>

            <div class="jumbotron bg-primary square">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="text-light font-weight-bold">{name}</h1>
                        <div className="lead">
                            {description && description.substring(0, 160)}...
                        </div>
                        {/* title */}

                        <Badge count={category} style={{background: "#03a964"}} className="pd-4 mr-2" />
                        {/* title */}
                        <p>Created by {instructor.name}</p>
                        {/* title */}
                        <p>Last updated {new Date(updateAt).toLocaleDateString()}</p>
                        {/* title */}
                        <h4 className="text-light">{
                            paid ? currencyFormatter({
                                amount: price,
                                currency : 'use'
                            }) : 'Free'
                        }</h4>
                    </div>
                    <div className="col-md-4">
                        <p>show course image</p>
                        <p>show enroll button</p>
                        {/* show video preview or coure image */}
                        {/* enroll button */}
                    </div>
                </div>
            </div>

        </>
    )
};

export async function getServerSideProps({ query }) {
    console.log('query')
    const { data } = await axios.get(`${process.env.API}/course/${query.slug}`)
    return {
        props: {
            course: data
        }
    }
}

export default SingleCourse