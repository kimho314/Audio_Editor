import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AudioUpload = ({ setNewAudioFlag }) => {
    const [audioFile, setAudioFile] = useState(null);
    const [title, setTitle] = useState('');
    const [album, setAlbum] = useState('');
    const [artist, setArtist] = useState('');

    const uploadAudioApi = (audio) => {
        return fetch('uploadAudio', {
            method: 'POST',
            body: audio
        }).then(response => response.json());
    };


    const handleUploadAudio = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userId", localStorage.getItem("userId"));
        formData.append("audioFile", audioFile);
        formData.append("title", title);
        formData.append("album", album);
        formData.append("artist", artist);


        const response = await uploadAudioApi(formData);
        console.log("handleUploadAudio >>>>>>>>>>");
        console.log(response);
        if (response.result === "ok") {
            alert('음악 파일 업로드 완료!!!');
        } else {
            alert('음악 파일 업로드 실패!!!');
        }
        // setNewAudioFlag(true);
        setNewAudioFlag();
        e.target.reset();
    };


    return (
        <Container>
            <h3>음악 파일 업로드</h3>
            <form onSubmit={handleUploadAudio} encType='multipart/form-data'>
                <div>
                    <input type="file" name="audio_file" accept="audio/*"
                        onChange={(e) => { setAudioFile(e.target.files[0]) }}
                    />
                </div>
                <div>
                    <input type="text" name="title"
                        onChange={(e) => { setTitle(e.target.value) }} placeholder="곡제목"
                    />
                </div>
                <div>
                    <input type="text" name="album"
                        onChange={(e) => { setAlbum(e.target.value) }} placeholder="앨범명"
                    />
                </div>
                <div>
                    <input type="text" name="artist"
                        onChange={(e) => { setArtist(e.target.value) }} placeholder="아티스트명"
                    />
                </div>
                <div>
                    <button type="submit">Upload</button>
                </div>
            </form>
        </Container>
    )
}

export default AudioUpload;