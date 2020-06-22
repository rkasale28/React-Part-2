import React, { Component } from 'react'
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form'
import { Loading } from './LoadingComponent';

const maxlength = (len) => (val) => !val || (val.length<=len)
const minlength = (len) => (val) => !val || (val.length>=len)

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment)
    }

    render() {
        return (
            <>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating:</Label>
                            <Col md={12}>
                            <Control.select model=".rating" id="rating"
                            name="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="name" md={12}>Your Name:</Label>
                            <Col md={12}>
                                <Control.text model=".name" id="name" 
                                name="name" className="form-control" 
                                placeholder="Your Name"
                                validators={{
                                    minlength: minlength(3), maxlength: maxlength(15)
                                }}/>
                                <Errors 
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                    minlength: "Must be greater than 2 characters",
                                    maxlength: "Must be 15 characters or less"
                                }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment:</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col md={12}>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        );
    }
}

function RenderComments({ comments, addComment, dishId }) {
    if (comments != null) {
        const comms = comments.map((cmnt) => {
            let date = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            }).format(new Date(Date.parse(cmnt.date)))

            return (
                <ul key={cmnt.id} className="list-unstyled">
                    <li className="comment">{cmnt.comment}</li>
                    <li className="author">-- {cmnt.author} , {date}</li>
                </ul>
            );
        })

        return (
            <>
            <div>{comms}</div>
            <CommentForm dishId={dishId} addComment={addComment}/>
            </>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderDish({dish, comments, addComment}) {
    if (dish != null) {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <RenderComments 
                    comments={comments} 
                    addComment={addComment}
                    dishId={dish.id}/>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null){
    return (
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.selectedDish.name}</h3>
                <hr />
            </div>
            <div className="row">
                <RenderDish dish={props.selectedDish} comments={props.comments} addComment={props.addComment}/>
            </div>
        </div>
    );
}
}

export default DishDetail