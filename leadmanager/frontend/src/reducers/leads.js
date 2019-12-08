import * as Types from "../actions/types";

const initialState = {
  leads: [],
  currentLead: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LEADS: {
      return {
        ...state,
        leads: action.payload
      };
    }
    case Types.DEL_LEAD: {
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload)
      };
    }
    case Types.ADD_LEAD: {
      return {
        ...state,
        leads: [...state.leads, action.payload]
      };
    }
    case Types.CURRENT_LEAD: {
      return {
        ...state,
        currentLead: action.payload
      };
    }
    case Types.UPDATE_LEAD: {
      const newLeads = state.leads.map((lead) => {
        if (lead.id === action.payload.id) {
          lead.name = action.payload.name;
          lead.email = action.payload.email;
          lead.message = action.payload.message;
          lead.create_at = action.payload.create_at;
        }
        return lead;
      });
      return {
        ...state,
        leads: newLeads,
        currentLead: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
