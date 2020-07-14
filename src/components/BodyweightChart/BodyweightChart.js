import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';

// starting data so on render it doesn't crash.
let data = [
  { argument: 1, value: 140 }
];

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});

const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);


class BodyweightChart extends Component {
  render() {

    console.log(`this.props.bodyweight.length ${this.props.bodyweight.length}`);

    if (this.props.bodyweight.length !== 0) {
      const { bodyweight, user } = this.props;

      data = [
        //moment(bodyweight[0].date).subtract(10, 'days').calendar();
        { argument: moment(bodyweight[0].date).format("MMMM Do YYYY"), value: bodyweight[0].user_bodyweight + ' lbs' },
        { argument: moment(bodyweight[1].date).format("MMMM Do YYYY"), value: bodyweight[1].user_bodyweight + ' lbs' },
        { argument: moment(bodyweight[2].date).format("MMMM Do YYYY"), value: bodyweight[2].user_bodyweight + ' lbs' },
        { argument: moment(bodyweight[3].date).format("MMMM Do YYYY"), value: bodyweight[3].user_bodyweight + ' lbs' },
        // { argument: 'Day ' + new Date(bodyweight[4].date).getDate(), value: bodyweight[4].weight + ' lbs' },
        // { argument: 'Day ' + new Date(bodyweight[5].date).getDate(), value: bodyweight[5].weight + ' lbs' },
        // { argument: 'Day ' + new Date(bodyweight[6].date).getDate(), value: bodyweight[6].weight + ' lbs' },
        // { argument: 'Day ' + new Date(bodyweight[7].date).getDate(), value: bodyweight[7].weight + ' lbs' },
        // { argument: 'Day ' + new Date(bodyweight[8].date).getDate(), value: bodyweight[8].weight + ' lbs' },
        // { argument: 'Day ' + new Date(bodyweight[9].date).getDate(), value: bodyweight[9].weight + ' lbs' },

      ];
    }

    return (
      <Paper>
        <Chart
          data={data}
        >
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries
            //name={user.first_name}
            name="Jared"
            color="red"
            valueField="value"
            argumentField="argument"

          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Bodyweight change over time`}
          />
        </Chart>

      </Paper>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    bodyweight: state.bodyweight,
    user: state.user,
  }
}

export default connect(mapStateToProps)(BodyweightChart);