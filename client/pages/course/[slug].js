import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCourseLessons from "../../components/modal/SingleCourseLessons";
import { Context } from '../../context'

const SingleCourse = ({ course }) => {
    // state
    const [showModal, setShowModal] = useState(false)
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const { state: { user } } = useContext(Context)

    const router = useRouter();
    const { slug } = router.query

    const handlePaidEnrollment = () => {
        console.log('handle paid enrollment.')
    }

    const handleFreeEnrollment = () => {
        console.log('handle Free enrollment.')
    }

    return (
        <>

            <SingleCourseJumbotron 
                course={course} 
                showModal={showModal} 
                setShowModal={setShowModal} 
                preview={preview} 
                setPreview={setPreview} 
                user={user}
                loading = {loading}
                handlePaidEnrollment={handlePaidEnrollment}
                handleFreeEnrollment={handleFreeEnrollment}
            />

            {showModal ? course.lessons[0].video.Location : "don't show"}
            <PreviewModal showModal={showModal} setShowModal={setShowModal} preview={preview} />

            {course.lessons && (
                <SingleCourseLessons
                    lessons={course.lessons}
                    setPreview={setPreview}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
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