// Jamie Padovano
/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useControls, button } from 'leva';
import TWEEN from '@tweenjs/tween.js';

// Reference: https://github.com/Sean-Bradley/React-Three-Fiber-Boilerplate - used to help figure out rotating different groups of cubes

const resetCubeGroup = (cubeGroup, rotationGroup) => {
  rotationGroup.children
    .slice()
    .reverse()
    .forEach(c => cubeGroup.attach(c))
  rotationGroup.quaternion.set(0, 0, 0, 1)
}

const attachToRotationGroup = (cubeGroup, rotationGroup, axis, limit) => {
  cubeGroup.children
    .slice()
    .reverse()
    .filter(c => limit < 0 ? c.position[axis] < limit : c.position[axis] > limit)
    .forEach(c => rotationGroup.attach(c))
}

const animateRotationGroup = (rotationGroup, axis, multiplier) => {
  new TWEEN.Tween(rotationGroup.rotation)
    .to(
      {
        [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier
      },
      250
    )
    .easing(TWEEN.Easing.Cubic.InOut)
    .start()
}

const rotate = (cubeGroup, rotationGroup, axis, limit, multiplier) => {
  if (!TWEEN.getAll().length) {
    resetCubeGroup(cubeGroup, rotationGroup)
    attachToRotationGroup(cubeGroup, rotationGroup, axis, limit)
    animateRotationGroup(rotationGroup, axis, multiplier)
  }
}

export default function Controls({ cubeGroup }) {
  const rotationGroup = useRef()

  useControls('Cube', {
    'Left CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'x', -0.5, 1)
    }),
    'Left CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'x', -0.5, -1)
    }),
    'Right CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'x', 0.5, -1)
    }),
    'Right CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'x', 0.5, 1)
    }),
    'Back CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'z', -0.5, 1)
    }),
    'Back CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'z', -0.5, -1)
    }),
    'Front CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'z', 0.5, -1)
    }),
    'Front CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'z', 0.5, 1)
    }),
    'Top CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'y', 0.5, -1)
    }),
    'Top CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'y', 0.5, 1)
    }),
    'Bottom CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'y', -0.5, 1)
    }),
    'Bottom CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'y', -0.5, -1)
    })
  })

  return (
    <>
      <group ref={rotationGroup} />
    </>
  )
}