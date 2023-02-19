import { ADD_EMAIL,GET_EMAIL_STATUS }  from '../Types';
 
interface IEmailData {
  _id: string,
  to: string;
  subject: string;
  text: string;
  html?: string;
}


interface IInitialState {
  emails: IEmailData[];
}

const initialState: IInitialState = {
  emails: [],
};
  
function emailReducer(state = initialState, action: { type: any; payload: { _id: any; }; }) {
    switch (action.type) {

      case ADD_EMAIL:
      return {
        ...state,
        emails: [...state.emails, action.payload],
      };
      case GET_EMAIL_STATUS:
        return {
          ...state,
          emails: state.emails.map((email: IEmailData) =>
          email._id === action.payload._id ? action.payload : email
        ),
        };
      default:
        return state;
    }
  }

  export default emailReducer;