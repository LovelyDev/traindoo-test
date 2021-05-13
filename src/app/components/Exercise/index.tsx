import React, { useEffect, useState } from 'react';
import { useFirestore } from "react-redux-firebase";

export const Exercise = (): JSX.Element => {
  interface Provider {
    category: string;
    exerciseName: string;
    sets: any;
  }
  interface Set {
    load: number;
    reps: number;
    rpe: number;
  }
  const [exercises, setExercises] = useState<Provider[]>([]);
  const [sets, setSets] = useState<Set[]>([{load: 3, reps: 3, rpe: 3}, {load: 3, reps: 3, rpe: 3}]);
  const firestore = useFirestore();
  useEffect(() => {
    firestore
    .collection('Training').get()
    .then(snapshot => {
      let result: any = [];
      snapshot.docs.forEach((doc, i) => 
      {
        result[i] = { id: doc.id, exercises: [] };
        const _exercises: any = doc.data().exercises;
        _exercises.forEach((exercise: any, j: number) => {
          const path = exercise.path;
          
          firestore.doc(path).get()
          .then(doc => {
            const d: any = doc.data();
            console.log("exercise", d);
            result[i].exercises[j] = { ...d };
            d.sets.forEach((set: any, m: number) => {
              const setPath = set.path;
              firestore.doc(setPath).get()
              .then((doo: any) => {
                result[i].exercises[j].sets[m] = {...doo.data(), id: doo.id};
                console.log("result", result)
                setExercises(result[0].exercises);
                const newSets = result[0].exercises.map((ee: any) => {
                  return ee.sets[0];
                })
                setSets(newSets)
              })
            })
          })
          
        })
      });
    })
  }, [])
  const onSubmit = () => {

  }
  const handleSet = (index: number, type: string, id: any) => (e: any) => {
    const newSets = [...sets];
    newSets[index] = { ...sets[index], [type]: e.target.value}
    setSets(newSets);
    firestore.collection('Set').doc(id).update({ [type]: e.target.value }).then(() => {
      console.log("Document updated");
      firestore
    .collection('Training')
    .get().then(snapshot => {
      let result: any = [];
      snapshot.docs.forEach((doc, i) => 
      {
        result[i] = { id: doc.id, exercises: [] };
        const _exercises: any = doc.data().exercises;
        _exercises.forEach((exercise: any, j: number) => {
          const path = exercise.path;
          
          firestore.doc(path).get()
          .then(doc => {
            const d: any = doc.data();
            console.log("exercise", d);
            result[i].exercises[j] = { ...d };
            d.sets.forEach((set: any, m: number) => {
              const setPath = set.path;
              firestore.doc(setPath).get()
              .then((doo: any) => {
                result[i].exercises[j].sets[m] = {...doo.data(), id: doo.id};
                console.log("result", result)
                setExercises(result[0].exercises);
              })
            })
          })
          
        })
      });
    })
    })
  }
  return (
    <div>
      <span>Exercises</span>
      {exercises.map((e: any, index: number) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            <span style={{
              marginRight: '20px'
            }}>{e.category}</span>
            <span style={{
              marginRight: '20px'
            }}>{e.exerciseName}</span>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>{e.sets[0].load}</div>
                <input onChange={handleSet(index, 'load', e.sets[0].id)} value={sets[index].load}></input>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>{e.sets[0].reps}</div>
                <input onChange={handleSet(index, 'reps', e.sets[0].id)} value={sets[index].reps}></input>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>{e.sets[0].rpe}</div>
                <input onChange={handleSet(index, 'rpe', e.sets[0].id)} value={sets[index].rpe}></input>
              </div>
            </div>
          </div>
        )
      })}
      {/* <button onClick={onSubmit}>submit</button> */}
    </div>
  );
};
