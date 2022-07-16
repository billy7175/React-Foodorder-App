import { currencyFormatter } from "../../utils/helpers"
import { Badge, Modal, Button } from "antd"
import ReactPlayer from 'react-player'
import {LoadingOutlined, SafetyOutlined} from '@ant-design/icons'

const SingleCourseJumbotron = ({ 
    course, 
    showModal, 
    setShowModal, 
    preview, 
    setPreview, 
    loading, 
    user,
    handlePaidEnrollment,
    handleFreeEnrollment 
}) => {
  const { name, description, instructor, updateAt, lessons, image, price, paid, category } = course

  return (
    <div className="jumbotron bg-primary square">
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
            {JSON.stringify(lessons[0])}
            {lessons[0].video && lessons[0].video.Location ? 
            (<div onClick={() => {
                setPreview(lessons[0].video.Location)
                setShowModal(!showModal)
            }}>
                <ReactPlayer className="react-player-div" 
                    url={lessons[0].video.Location}
                    light={image.Location}
                    width="100%"
                    height="225px"
                />
            </div>) : (<div>
            
                    <img src = {image.Location} alt={name} className="img img-fluid" />
                
            </div>)}
            {/* show video preview or coure image */}
            {/* enroll button */}
            { loading ? (
                <div className="d-flex justify-content-center">
                    <LoadingOutlined className="h1 text-danger" />
                </div>
            ) : (
                <Button 
                    className="mb-3 mt-3" 
                    type="danger" 
                    block 
                    shape="round" 
                    icon={<SafetyOutlined />}
                    size="large"
                    disabled={loading}
                    onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                >
                    {user ? "Enroll" : "Login to enroll"}
                </Button>
            )}
        </div>
    </div>
</div>
  )
}

export default SingleCourseJumbotron

