import { Component } from 'react'

export default class Logout extends Component {
    render() {
        sessionStorage.clear();
        return (window.location.href="/")
    }
}
