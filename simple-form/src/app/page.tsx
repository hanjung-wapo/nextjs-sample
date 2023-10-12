'use client';

import './globals.css';

import { ChangeEvent, useState } from 'react';

export default function Home() {
  const [sqlQuery, setSqlQuery] = useState('--Start writing your query');

  const [translatedQuery, setTranslatedQuery] = useState('');
  const handleQueryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSqlQuery(e.target.value);
    translateQuery(e.target.value);
  };

  const translateQuery = (sqlQuery: string) => {
    const pieces = sqlQuery.split(' ').filter((piece) => piece);
    const queryObject = {
      operation: 'SELECT',
      table: '',
      conditions: [],
    };

    let translation = '';

    if (pieces[0].toUpperCase() !== 'SELECT') {
      queryObject.operation = pieces[0];
    }

    for (let i = 1; i < pieces.length; i++) {
      if (pieces[i - 1].toUpperCase() === 'FROM') {
        queryObject.table = pieces[i];
      }
    }

    if (queryObject.operation === 'SELECT') {
      translation = 'db.getCollection("' + queryObject.table + '")';
    }

    if (queryObject.conditions.length === 0) {
      translation += '.find({}) ';
    }

    setTranslatedQuery(translation);
  };

  return (
    <main>
      <div className="flex-container">
        <section className="sql-query-secion">
          <label>SQL Query:</label>
          <div>
            <textarea
              rows={5}
              cols={50}
              className="textarea-simple"
              value={sqlQuery}
              onChange={handleQueryChange}
            ></textarea>
          </div>
        </section>
        <section className="translated-section">
          <label>Result:</label>
          <section className="translated-result">{translatedQuery}</section>
        </section>
      </div>
    </main>
  );
}

function isAlphanumeric(str: string) {
  return str.match(/^[a-zA-Z0-9]+$/) !== null;
}
