import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCourseLessons from "../../components/modal/SingleCourseLessons";
import { Context } from '../../context'
import { loadStripe } from "@stripe/stripe-js";

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

    const handlePaidEnrollment = async () => {
        try {
            confirm('등록하시겠습니까?')
        //   setLoading(true);
        //   if (!user) router.push("/login");
        //   if (enrolled.status)
        //     return router.push(`/user/course/${enrolled.course.slug}`);
        //   const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
        //   const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
        //   stripe.redirectToCheckout({ sessionId: data });
        } catch (err) {
          console.log("Enrollment failed, try again.");
          console.log(err);
          setLoading(false);
        }
      };

    const handleFreeEnrollment = async (e) => {
        console.log('handle Free enrollment.')
        e.preventDefault()
        // check if user is logged in 
        // check if already enrolled
        alert('handleFreeEnrollment')
        if(!user) router.push("/login")
        if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`)
        
        try {
            setLoading(true)
            const {data} = await axios.post(`/api/free-enrollment/${course._id}`)
            setLoading(false)
            router.push(`/user/course/${data.course.slug}`)
            console.log('Enrollemnt 성공', data.messaage)
        } catch(error){
            setLoading(false)
            console.log('Enrollment failed.')
        }
    }

    return (
        <>
            {JSON.stringify(course,null,4)}
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