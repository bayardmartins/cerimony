import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from "react-bootstrap/Form";

import api from '../../services/api';
import './styles.css'

const Rating = () => {
    const [message, setMessage] = useState([]); 
    const [radioValue, setRadioValue] = useState();
    const navigate = useNavigate();

    const radios = [
        { name: 'like'},
        { name: 'dislike'}
    ];
    
    const fetchRating = async () => {
        const data = {
            state: "finished",
            message: message,
            id: '619058c5d4f2ba7e0dda4899',
          };

        try {
            const response = await api.post("/ratings", data);
            if (response.status === 200) {
                alert(response);
                //navigate('/schedules');
            }else{
                alert(response.message);
            }
          } catch (e) {
            console.log("error " + e);
          }
    };

    return (
        <div className="container card mt-3">
      <h2 className="mt-3 text-center">Cerimony</h2>
      <h4 className="text-center">Cerimônias inteligentes</h4>
      
      <div className="mb-3">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Deixe uma mensagem sobre essa cerimônia</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(evt) =>
              setMessage(evt.target.value.replace(/\s{2,}/g, ""))
            }
          />
        </Form.Group>
      </div>

      <div className="mb-3">
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-danger' : 'outline-success'}
            name="radio"
            value={radio.name}
            checked={radioValue === radio.name}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      </div>

      <div className="mb-3">
        <Button
          size="sm"
          variant="outline-primary"
          className="me-1"
          onClick={fetchRating}
        >
          Avaliar
        </Button>
      </div>
    </div>
    );
};

export default Rating;