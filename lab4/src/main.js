import Vue from 'vue'
import App from './App.vue'

import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"
import VueResource from 'vue-resource'


Vue.use (VueResource);

const apolloClient = new ApolloClient({
  uri: "http://3.230.92.44:5000/graphql"
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app')



