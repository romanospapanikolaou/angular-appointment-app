import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  newAppointmentLocation: string = ''; // Add this line
  appointments: Appointment[] = [];

  ngOnInit(): void {
    const savedAppointments = localStorage.getItem('appointments');
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment(): void {
    if (
      this.newAppointmentTitle.trim() &&
      this.newAppointmentDate &&
      this.newAppointmentLocation.trim()
    ) {
      const newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
        location: this.newAppointmentLocation, // Add this line
      };
      this.appointments.push(newAppointment);
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();
      this.newAppointmentLocation = ''; // Add this line

      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number): void {
    this.appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
