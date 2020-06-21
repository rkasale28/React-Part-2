import React, { Component } from 'react'
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap'

class DishDetail extends Component {
    renderComments(comments) {
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

    renderDish(dish) {
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
                        {this.renderComments(dish.comments)}
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderDish(this.props.selectedDish)}
                </div>
            </div>
        );
    }
}

export default DishDetail