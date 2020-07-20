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
import { array } from 'prop-types';

// starting data so on render it doesn't crash
let data = []


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

    // console.log(`this.props.bodyweight.length ${this.props.bodyweight.length}`);
    const { bodyweight, user } = this.props;
    let tempArray = []
    if (this.props.bodyweight.length !== 0) {

      for (let i = 0; i < bodyweight.length; i++) {
        tempArray.push({ argument: moment(bodyweight[i].date).format("MMMM Do YYYY"), value: bodyweight[i].user_bodyweight + ' lbs' })
      }
      data = tempArray;
    }

    return (
      
      <Paper>
        <Chart
          data={data}
        >
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries
            name={user.username || 'me' }
            // name="Jared"
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