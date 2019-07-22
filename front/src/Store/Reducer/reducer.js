const initialState = {
  connecter: "",
  panier: []

}
var d = []
function product(state = initialState, action) {


  switch (action.type) {
    case 'CONNECTER':
      state = { ...state, connecter: action.value }
      console.log("connecter", state.connecter);
      return state


    case 'PANIER':

      d.push(action.value)

      state = { ...state, panier: d }
      console.log("connecter", state.panier);
      return state


    case 'SUPPRPANIER':

      d.splice(action.value,1)

      state = { ...state, panier: d }
      console.log("connecter", state.panier);
      return state

    case 'DECONNECTE':
      state = { ...state, connecter: "" }
      console.log("connecter", state.connecter);
      return state


    default:
      return state
  }
}

export default product