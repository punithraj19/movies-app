import { useState, useEffect } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import {useHistory} from "react-router-dom";

const Home = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await axios(`http://localhost:4000/api/movies?searchText=${searchText}`);
            setLoading(false);
            setMovies(response.data);
            setError(null);
        }
        catch (e) {
            setLoading(false);
            setError(`Server Error: ${e.message}`);
        }
    }

    const onClickViewMovie = ({ id }) => {
        history.push(`/${id}`);
    }

    return (
        <>
            <SearchBar onClickRefresh={fetchMovies} setSearchText={setSearchText} />
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ?
                <Loader />
                : <div className="d-flex flex-wrap justify-content-start">
                    {movies.map(movie => {
                        const { title, id } = movie;

                        return (
                            <Card key={id} className="m-3 movie-card">
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>
                                            What about React version? Please note: You need to be using React. 
                                    </Card.Text>
                                    <Button variant="success" onClick={() => onClickViewMovie(movie)}>
                                         View Movie
                                    </Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Home;