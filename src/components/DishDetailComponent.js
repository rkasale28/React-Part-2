import React from 'react'
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'

function RenderComments({ comments }) {
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
            <div>{comms}</div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderDish({ dish, comments }) {
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
                    <RenderComments comments={comments} />
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
                <RenderDish dish={props.selectedDish} comments={props.comments}/>
            </div>
        </div>
    );
}

export default DishDetail