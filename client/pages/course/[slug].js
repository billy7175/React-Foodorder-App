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
    const [enrolled, setEnrolled] = useState({})

    const { 
        state: { user } 
    } = useContext(Context)

    useEffect(() => {
        //
        if(user && course) checkEnrollment()
    }, [user, course])

    const checkEnrollment = async () => {
        const {data} = await axios.get(`/api/check-enrollment/${course._id}`)
        console.log('#check enrollment', data)
        setEnrolled(data)
    }

    const router = useRouter();
    const { slug } = router.query

    const handlePaidEnrollment = () => {
        console.log('handle paid enrollment.')
    }

    const handleFreeEnrollment = async (e) => {
        console.log('handle Free enrollment.')
        e.preventDefault()
        try {
            setLoading(true)
            const {data} = await axios.post(`/api/free-enrollment/${course._id}`)
            console.log('Enrollemnt 성공', data.messaage)
        } catch(error){
            console.log('Enrollment failed.')
        }
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
                enrolled={enrolled}
                setEnrolled={setEnrolled}
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