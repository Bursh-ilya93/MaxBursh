import React, {Component} from "react";


class UploadFile extends Component {
    addImages = (e) => {
        const {sendImages} = this.props;
        const files = e.target.files;

        Object.values(files).forEach((file, i) => {
            console.log('here');
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = (data) => {
                const img = data.target.result;
                sendImages({img : data.target.result, file, count : i});
            };
        });
    };

    render() {
        return (
            <div className={'upload-file'}>
                <div>
                    <p><span className='first'>Просто перетащите фотографии в эту область</span><br/>
                        <span className='second'>или нажмите кнопку для загрузки.</span></p>
                    <div className="upload-file__button">
                        <label>Выберите файл</label>
                        <input type="file" onChange={this.addImages}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadFile;


