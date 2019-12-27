import React, { useEffect, useContext } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import ItemList from "../itemList"
import styled from "styled-components"
import { DocRefContext } from "../../contexts";

const Section = styled.section`
border-top: #f3f3f3 1px solid;
display: grid;
overflow-x: auto;
grid-auto-flow: column;
grid-auto-columns: 50%;
grid-template-rows: 1fr;
width: 100%;
height: 100vh;
grid-column: 2;
grid-row: 2;
scroll-behavior: smooth;
scroll-snap-type: x mandatory;
`

const Docs = React.memo(() => {

  const map = {
    "base": {
      "sub": {
        "MLA rooster": {
          title: 'MLA rooster', icon: true, "sub": {
            Huiswerk: {
              title: 'Huiswerk', icon: true, sub: {
                Nederlands: { title: 'Nederlands' },
                Wiskunde: { title: 'Wiskunde' },
                Bedrijfseconomie: { title: 'Bedrijfseconomie' }
              }
            },

            Studiewijzer: {
              title: 'Studiewijzer', icon: true, sub: {
                Nederlands: { title: 'Nederlands' },
                Wiskunde: { title: 'Wiskunde' },
                Bedrijfseconomie: { title: 'Bedrijfseconomie' },
                Engels: { title: 'Engels' },
                Scheikunde: { title: 'Scheikunde' },
                Natuurkunde: { title: 'Natuurkunde' },
                PWS: { title: 'PWS' },
                "Lichamelijk opvoeding": { title: 'Lichamelijk opvoeding' }
              }
            }
          }
        },

        "VisValk": {
          title: 'VisValk', icon: true, "sub": {
            Huiswerk: {
              title: 'Huiswerk', icon: true, sub: {
                Nederlands: { title: 'Nederlands' },
                Wiskunde: { title: 'Wiskunde' },
                Bedrijfseconomie: { title: 'Bedrijfseconomie' }
              }
            },
          }
        },

        "Nederlandse Feestdagen": {
          title: 'Nederlandse Feestdagen',
          icon: true,
          "sub": {
            Huiswerk: {
              title: 'Huiswerk', icon: true, sub: {
                Nederlands: { title: 'Nederlands' },
                Wiskunde: { title: 'Wiskunde' },
                Bedrijfseconomie: {
                  title: 'Bedrijfseconomie', "sub": {
                    Huiswerk: {
                      title: 'Huiswerk', icon: true, sub: {
                        Nederlands: { title: 'Nederlands' },
                        Wiskunde: { title: 'Wiskunde' },
                        Bedrijfseconomie: { title: 'Bedrijfseconomie' }
                      }
                    }
                  }
                }
              }
            },
          }
        }
      }
    }
  }
  const { docRef, setDocRef } = useContext(DocRefContext)

  useEffect(() => {
    const scrollLine = document.getElementById("scrollLine");
    const refLenght = docRef.length;
    const paddingLeft = scrollLine.children[refLenght - 1].offsetLeft;
    scrollLine.scrollLeft = paddingLeft;
  }, [docRef])

  let prevMap = map;
  const move = (e, i) => setDocRef(prev => [...prev.splice(0, i + 1), e]);
  const getMap = (refElm) => prevMap[refElm]["sub"] ? prevMap[refElm]["sub"] : {};


  return (
    <Section id="scrollLine">
      {docRef.map((refElm, i) => {
        prevMap = getMap(refElm);
        let active = docRef[i + 1]
        return <ItemList click={e => move(e, i)} active={active} items={Object.values(prevMap)} />
      })}
    </Section>
  );
})

export default Docs;
