import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import Points from '../components/BootstrapChallenge/Points';
import Leaderboard from '../components/Leaderboard';
import cheerGif from '/images/fireGif.gif';
import { getAllDataFromSupabase } from '../../utils/Supabase';
import toast from 'react-hot-toast';

const FinalScores = () => {
	const [finalScores, setFinalScores] = useState(null);
	const [playersData, setPlayersData] = useState([]);
	const [showLeaderboard, setShowLeaderboard] = useState(false);
	const handleButtonClick = () => {
		setShowLeaderboard(false)
	}

	async function getPlayersData() {
		try {
			const data = await getAllDataFromSupabase();
			const sortedData = data.sort((a, b) => b.score - a.score);
			const topTenData = sortedData.slice(0, 10);
			setPlayersData(topTenData);
		} catch (error) {
			toast.error(error.message);
		}
	}

	useEffect(() => {
		getPlayersData();
	}, []);

	
	return (
		<Container>
			<Row>
				<Col md="6">
					<Image className="pe-md-5 my-5" src={cheerGif} alt="CodeQuest background" fluid rounded />
				</Col>
				<Col md="6" className="my-5 py-5">
					<h1>Leaderboard</h1>
					<table className="table mt-2 border-0  table-dark bg-secondary">
						<thead className='p-2'>
							<tr className="table-dark border-danger">
								<th className="text-danger p-3" scope="col">Player</th>
								<th className="text-success p-3" scope="col">Score</th>
							</tr>
						</thead>
						<tbody>
							{playersData.map(({ name, score, id }) => (
								<tr key={id} scope="row">
									<td>{name}</td>
									<td>{score}</td>
								</tr>)
							)}
						</tbody>
					</table>
					
					<Button
						className="rounded-pill my-5 gradient-bg-orange text-white btn-lg"
						style={{ width: 'auto' }}
						variant="warning"
						onClick={() => setShowLeaderboard(!showLeaderboard)}
					>
						Start Again
					</Button>
					{showLeaderboard && <Leaderboard onClose={handleButtonClick} />}
				</Col>
			</Row>
		</Container>
	);
};

export default FinalScores;




const LeaderBoard = ({ onClose }) => {
	const [playersData, setPlayersData] = useState([]);

	async function getPlayersData() {
		try {
			const data = await getAllDataFromSupabase();
			const sortedData = data.sort((a, b) => b.score - a.score);
			const topTenData = sortedData.slice(0, 10);
			setPlayersData(topTenData);
		} catch (error) {
			toast.error(error.message);
		}
	}

	useEffect(() => {
		getPlayersData();
	}, []);

	return (
		<div className="d-flex justify-content-center">
			<Modal.Dialog scrollable className="border border-info border-3 rounded p-5" >
				<Modal.Header className='text-center'>
					<h2 className='modal-title w-100 h3 me-5 text-warning'>Leaderboard</h2>
					<button type="button" className="btn-close btn-close-white m-1" data-bs-dismiss="modal" aria-label="Close" onClick={() => onClose()}></button>
				</Modal.Header>
				<Modal.Body className="m-1 ">
					<table className="table mt-2 border-0  table-dark bg-secondary">
						<thead className='p-2'>
							<tr className="table-dark border-danger">
								<th className="text-danger p-3" scope="col">Player</th>
								<th className="text-success p-3" scope="col">Score</th>
							</tr>
						</thead>
						<tbody>
							{playersData.map(({ name, score, id }) => (
								<tr key={id} scope="row">
									<td>{name}</td>
									<td>{score}</td>
								</tr>)
							)}
						</tbody>
					</table>
				</Modal.Body>
				<Modal.Footer>
					<Button className="m-2 rounded-pill gradient-bg-orange text-white btn-lg px-5" variant="outline-warning" onClick={() => onClose()}>Close</Button>
				</Modal.Footer>
			</Modal.Dialog>
		</div>
	)
}

export default LeaderBoard;
