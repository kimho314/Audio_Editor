import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactAudioPlayer from 'react-audio-player';
import AudioUpload from './AudioUpload';

const AudioEdit = ({ setHasCookie, removeCookie }) => {

    const [audioList, setAudioList] = useState([]);
    const [selectedAudio, setSelectedAudio] = useState('');

    const [newAudioFlag, setNewAudioFlag] = useState(false);

    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState(null);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [goSearch, setGoSearch] = useState(false);

    useEffect(() => {
        handleGetAudioList();
    }, [newAudioFlag]);

    const getAudioListApi = (userId) => {
        return fetch(`/audioList/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    };

    const handleGetAudioList = async () => {
        let userId = localStorage.getItem("userId");
        const response = await getAudioListApi(userId);
        console.log("handleGetAudioList >>>>>>>>>>");
        console.log(response);

        if (response.result === "token expired") {
            setHasCookie(false);
        } else {
            setAudioList(response.data);
        }

        setNewAudioFlag(false);
    }



    const playAudioApi = (trackName, userId) => {
        return fetch(`playUploadAudio?userId=${userId}&trackName=${trackName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            // response.json();
            setSelectedAudio(`playUploadAudio?userId=${userId}&trackName=${trackName}`);
        });
    };

    const handlePlayAudio = async (e) => {
        console.log("handlePlayAudio >>>>>>>>>>");
        // console.log(e.target.parentNode.parentNode.children[1].innerText);
        let trackName = e.target.parentNode.parentNode.children[1].innerText;
        let userId = localStorage.getItem('userId');
        let ret = await playAudioApi(trackName, userId);
        // console.log(ret);
        if (ret !== undefined &&
            (ret.result === "audio no exist in server" || ret.result === "audio no exist in DB")) {
            console.error(ret.result);
            alert('음악 재생 불가');
        }
    };

    const handleEditAudio = (e) => {
        // console.log(e.target.parentNode.parentNode.children[0].innerText);
        let modalDataIn = {
            trackName: e.target.parentNode.parentNode.children[1].innerText,
            title: e.target.parentNode.parentNode.children[2].innerText,
            album: e.target.parentNode.parentNode.children[3].innerText,
            artist: e.target.parentNode.parentNode.children[4].innerText,
        };
        console.log("modalDataIn", modalDataIn);
        setModalData(modalDataIn);
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
    };


    const updateAudioApi = (audio) => {
        return fetch('updateAudio', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(audio)
        }).then(response => response.json());
    };

    const handleUpdateAudio = async () => {
        let newAudio = {
            trackName: modalData.trackName,
            title: modalData.title,
            album: modalData.album,
            artist: modalData.artist,
            userId: localStorage.getItem('userId'),
        };
        console.log('newAudio: ', newAudio);
        let ret = await updateAudioApi(newAudio);
        console.log('res: ', ret);
        if (ret.result === 'ok') {
            alert('오디어 변경 성공!');
            handleModalClose();
        }
    };

    const handleAudioSearch = () => {
        console.log("handleAudioSearch >>>>>>>>>>");
        console.log(searchKeyword);
        if (searchKeyword !== '') {
            setGoSearch(true);
        } else {
            setGoSearch(false);
        }
    }

    return (
        <div>
            <Button variant="primary" onClick={removeCookie}>logout</Button>
            <hr />
            <AudioUpload setNewAudioFlag={() => { setNewAudioFlag(true) }} />
            <hr />
            <Container>
                <h3>음악 리스트</h3>
                <Container>
                    <input type="text" name="search"
                        onChange={(e) => { setSearchKeyword(e.target.value) }}
                        placeholder="곡 제목"
                    />
                    <Button variant="primary"
                        onClick={handleAudioSearch}
                        style={{ marginLeft: '5px' }}>
                        SEARCH
                    </Button>
                </Container>
                <Container>
                    <ReactAudioPlayer
                        src={selectedAudio}
                        autoPlay
                        controls
                    />
                </Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>TRACK NAME</th>
                            <th>TITLE</th>
                            <th>ALBUM</th>
                            <th>ARTIST</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!goSearch && audioList.map((v, i) => {
                            return (
                                <tr key={v.SEQ}>
                                    <td>{i + 1}</td>
                                    <td style={{
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '500px',
                                        overflow: 'hidden'
                                    }}>{v.TRACK_NAME}</td>
                                    <td>{v.TITLE}</td>
                                    <td>{v.ALBUM}</td>
                                    <td>{v.ARTIST}</td>
                                    <td>
                                        <Button variant="primary" onClick={handlePlayAudio}
                                            style={{ marginRight: '5px' }}>PLAY</Button>
                                        <Button variant="primary" onClick={handleEditAudio}
                                            style={{ marginLeft: '5px' }}>EDIT</Button>
                                    </td>
                                </tr>
                            )
                        })}
                        {goSearch && audioList
                            .filter(item => { return item.TRACK_NAME.includes(searchKeyword) })
                            .map((v, i) => {
                                return (
                                    <tr key={v.SEQ}>
                                        <td>{i + 1}</td>
                                        <td style={{
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '500px',
                                            overflow: 'hidden'
                                        }}>{v.TRACK_NAME}</td>
                                        <td>{v.TITLE}</td>
                                        <td>{v.ALBUM}</td>
                                        <td>{v.ARTIST}</td>
                                        <td>
                                            <Button variant="primary" onClick={handlePlayAudio}
                                                style={{ marginRight: '5px' }}>PLAY</Button>
                                            <Button variant="primary" onClick={handleEditAudio}
                                                style={{ marginLeft: '5px' }}>EDIT</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

                <Modal show={modalShow} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Audio Edit Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>TRACK NAME</th>
                                    <th>TITLE</th>
                                    <th>ALBUM</th>
                                    <th>ARTIST</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text" name="track_name"
                                            onChange={(e) => { setModalData({ ...modalData, trackName: e.target.value }) }}
                                            placeholder={modalData && modalData.trackName} />
                                    </td>
                                    <td>
                                        <input type="text" name="title"
                                            onChange={(e) => { setModalData({ ...modalData, title: e.target.value }) }}
                                            placeholder={modalData && modalData.title} />
                                    </td>
                                    <td>
                                        <input type="text" name="album"
                                            onChange={(e) => { setModalData({ ...modalData, album: e.target.value }) }}
                                            placeholder={modalData && modalData.album} />
                                    </td>
                                    <td>
                                        <input type="text" name="artist"
                                            onChange={(e) => { setModalData({ ...modalData, artist: e.target.value }) }}
                                            placeholder={modalData && modalData.artist} />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>CLose</Button>
                        <Button variant="primary" onClick={handleUpdateAudio}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default AudioEdit;