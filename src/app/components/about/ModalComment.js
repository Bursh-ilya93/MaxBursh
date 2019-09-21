import React, {Component} from 'react';
import closeWhite from "./../../../assets/images/pps/closeWhite.svg";
import {connect} from "react-redux";
import {sendComment} from "../../../redux/about/actions";
import ReCAPTCHA from "react-google-recaptcha";
import StarRatingComponent from 'react-star-rating-component';

class ModalComment extends Component {
    state = {
        name : '',
        email: '',
        text : '',
        rating: 1
    };

    changeText = (type, e) => {
        this.setState({
            [type]: e.target.value
        });
    };

    formSubmit = (e) => {
        const {name, email, text} = this.state;
        console.log(name, email, text);
        e.preventDefault();
    };

    captchaConfirm = (...props) => {
        console.log(props);
    };

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render() {
        const {mapLink, close, city, rating} = this.props;

        return (
            <div className={'popup modal-comment'}>
                <div className={'close'} onClick={close}>
                    <img src={closeWhite}/>
                </div>

                <div className={'modal-comment__main'}>
                    <p className='title'>Оставить отзыв о кассе <br/> в {city}</p>
                    <form onSubmit={this.formSubmit}>
                        <input
                            onChange={(e) => this.changeText('name', e)}
                            className={'comment-input'}
                            type="text"
                            placeholder='Ваше имя'/>
                        <input
                            onChange={(e) => this.changeText('email', e)}
                            className={'comment-input'}
                            type='email'
                            placeholder='Ваш e-mail' />
                        <textarea
                            onChange={(e) => this.changeText('text', e)}
                            className={'comment-input'}
                            placeholder='Ваш отзыв' />

                        <div className='stars'>
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                        <ReCAPTCHA
                            className={'captcha'}
                            sitekey="6Lf_24oUAAAAAItM5DII1AleOCJoOmxdf5k_ALz3"
                            onChange={this.captchaConfirm}
                        />
                        <button type='submit' className={'comment-button'}>Оставить отзыв</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        onSendComment: (data) => dispatch(sendComment(data))
    })
)(ModalComment);