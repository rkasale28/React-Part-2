import { DISHES } from '../shared/dishes.js'
import { COMMENTS } from '../shared/comments.js'
import { PROMOTIONS } from '../shared/promotions.js'
import { LEADERS } from '../shared/leaders.js'

export const initialState={    
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

export const Reducer = (state = initialState,action) =>{
    return state;
}