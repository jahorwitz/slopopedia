// This is a mock submitted slops page. To be replaced with actual Submitted Slops Component.

import { Link } from "react-router-dom";

export const mockSlops = [
  {
    id: "slop1",
    title: "Slop 1",
    releaseYear: 2077,
    runtime: 90,
    score: 100,
    howToWatch: "HBO Max",
    keyword: "Alpha, Delta, Beta",
  },
  {
    id: "slop2",
    title: "Slop 2",
    releaseYear: 2024,
    runtime: 30,
    score: 50,
    howToWatch: "Netflix",
    keyword: "Gamma, Zeta, Theta",
  },
];

export const SubmittedSlops = () => {
  return (
    <div>
      <h2>Submitted Slops</h2>
      <ul>
        {mockSlops.map((slop) => (
          <li key={slop.id}>
            <h3>{slop.title}</h3>
            <p>{slop.releaseYear}</p>
            <p>{slop.runtime}</p>
            <p>{slop.score}</p>
            <p>{slop.howToWatch}</p>
            <p>{slop.keyword}</p>
            <Link to={`/edit-slop/${slop.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
