import React, {Component} from "react";
import {connect} from "react-redux";
import UserHeader from "./UserHeader";
import UploadFile from "./UploadFile";
import {loadPassport, setImages} from "../../../redux/user/data/actions";

class UserData extends Component {
    addImages(e) {
        const files = e.target.files;
        const {setImages} = this.props;

        Object.values(files).forEach((file, i) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = ((event) => setImages({img : event.target.result, file, count : i}));
        });

    }

    render() {
        const {dataUser, images, files, loading, isLoadedPassport, messages} = this.props;
        const {onLoadPassport, onSetImages} = this.props;
        const info = dataUser.info;

        console.log(files);

        return (
            <div className="user-page">
                <div className="personal-data">
                    <UserHeader text={'Личные данные'}/>
                    <div className="body">
                        <div className="wrap-input">
                            <label>Логин:</label>
                            <input className={'input'} type="text" value={info.email} disabled/>
                        </div>
                        <div className="wrap-input">
                            <label>ФИО:</label>
                            <input className={'input'} type="text" disabled value={info.fullName}/>
                        </div>
                        <div className="wrap-input">
                            <label>Дата рождения:</label>
                            <input className={'input'} type="text" disabled value={info.birthday}/>
                        </div>
                        <div className="wrap-input">
                            <label>Город:</label>
                            <input className={'input'} type="text" disabled value={info.address}/>
                        </div>
                        <div className="wrap-input">
                            <label>Электронная почта:</label>
                            <input className={'input'} type="text" disabled value={info.email}/>
                        </div>
                        <div className="wrap-input">
                            <label>Мобильный телефон:</label>
                            <input className={'input'} type="text" disabled value={info.phone}/>
                        </div>
                    </div>
                    <UserHeader text={'Документ, удостоверяющий личность'}/>
                    <div className="body">
                        <div className="wrap-inputs">
                            <div className="wrap-input">
                                <label>Серия и номер паспорта:</label>
                                <input className={'input'} type="text" disabled value={info.passport}/>
                            </div>

                            <div className="wrap-input">
                                <label>Кем выдан:</label>
                                <input className={'input'} type="text" disabled value={info.iwho}/>
                            </div>
                            <div className="wrap-input">
                                <label>Когда выдан:</label>
                                <input className={'input'}  type="text" disabled value={info.iwhen}/>
                            </div>
                            <div className="wrap-input load-photo">
                                <label>
                                    {images.map(f => <img className={'img-passport'} src={f} alt="file"/>)}
                                </label>
                                <button className={'button'} onClick={() => files.length > 0 && onLoadPassport(files)}>Сохранить</button>
                            </div>
                            <UploadFile sendImages={onSetImages}/>
                            <div className={'attention-data'}>
                                В связи со вступлением в законную силу с 1 апреля 2019 года законодательства, требующего изменить процедуру верификации участников пари, просим Вас прислать на passport@maxline.by, помимо 31 и 33 страниц, Ваше персональное фото с паспортом (селфи).
                                Также Вы можете воспользоваться соответствующим
                                полем загрузки выше.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        dataUser         : state.user.main,
        images           : state.user.data.img,
        files            : state.user.data.files,
        loading          : state.user.data.loading,
        isLoadedPassport : state.user.data.isLoadedPassport,
        messages         : state.user.data.messages,
    }),
    dispatch => ({
        onSetImages      : (data) => dispatch(setImages(data)),
        onLoadPassport   : (data) => dispatch(loadPassport(data))
    })
)(UserData);