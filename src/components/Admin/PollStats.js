import React from "react";
import { Bar } from "react-chartjs-2";

// Chart.defaults.bar.scales.xAxes[0].categorySpacing = 0

class PollStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { poll } = this.props;
    this.getPollStats(poll);
  }

  getPollStats = (poll) => {
    let candidates = [];
    let votes = [];
    poll.candidates.forEach((candidate) => {
      candidates.push(candidate.candidateName);
    });
    poll.stats.forEach((stat) => {
      votes.push(stat.votes);
    });

    let colors = [];
    while (colors.length < candidates.length) {
      do {
        var color = Math.floor(Math.random() * 1000000 + 1);
      } while (colors.indexOf(color) >= 0);
      colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }

    this.setState({ candidates, votes, colors });
  };

  render() {
    let { poll } = this.props;
    let { candidates, votes, colors } = this.state || [];
    if (candidates && votes && colors) {
      return (
        <div>
          <div>
            <Bar
              data={{
                labels: candidates,
                datasets: [
                  {
                    label: "# of votes",
                    data: votes,
                    backgroundColor: colors,
                    borderColor: [colors],
                    borderWidth: 3,
                  },
                ],
              }}
              height={600}
              width={300}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [{ ticks: { beginAtZero: true } }],
                  xAxes: [
                    {
                      categorySpacing: 0,
                    },
                  ],
                },
              }}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            {poll.completed && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  //   border: "1px solid black ",
                  marginTop: "5rem",
                  padding: "10px",
                  boxShadow: "rgb(0 0 0 / 75%) 4px 3px 10px -3px",
                }}
              >
                <h5>The winner of this poll is </h5>
                &nbsp;
                <h5
                  style={{
                    fontStyle: "italic",
                    fontWeight: "500",
                    color: "#2f667b",
                  }}
                >
                  {" " + poll.winner.name}
                </h5>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return <div>No stats</div>;
    }
  }
}

export default PollStats;
