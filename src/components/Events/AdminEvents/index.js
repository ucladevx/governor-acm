import React from 'react'

import Button from 'components/Button/index'
import EventMonth from './eventMonth'

export default class AdminEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showAddEvent: false}
        this.showAddEvent = this.showAddEvent.bind(this);
        this.saveAddEventParent = this.saveAddEventParent.bind(this);
        this.cancelAddEventParent = this.cancelAddEventParent.bind(this);
    }

    showAddEvent(e) {
        console.log(e);
        this.setState(prev => ({
            showAddEvent: true
        }));
    }

    saveAddEventParent(e) {
        console.log("saved in parent");
        this.setState(prev => ({
            showAddEvent: false
        }));
    }

    cancelAddEventParent(e) {
        console.log("cancel in parent");
        this.setState(prev => ({
            showAddEvent: false
        }));
    }

    render() {
        const events = this.props.events;
        let months = [];
        let i = 0;

        while (i < events.length) {
            let month = { date: events[i].startDate, days: [] };
            while (i < events.length && events[i].startDate.month() === month.date.month()) {
                if (month.days.length === 0 || events[i].startDate.date() !== month.days[month.days.length - 1].date.date())
                    month.days.push({ date: events[i].startDate, events: [events[i]] });
                else
                    month.days[month.days.length - 1].events.push(events[i]);
                i++;
            }
            months.push(month);
        }

        if (this.props.error) {
            return <div className="events-dashboard admin-dashboard"><h1>{this.props.error}</h1></div>;
        } else {
            return (
                <div className="events-dashboard admin-dashboard">
                    {!this.state.showAddEvent && <Button
                        className={ "checkin-button" }
                        style="blue collapsible"
                        icon="fa-plus"
                        text="Add Event"
                        onClick={ this.showAddEvent } />}
                        
                    { months.map((month, i) => <EventMonth month={month} key={i} onClick={this.props.onClick} />) }
                </div>
            );
        }
    }
}