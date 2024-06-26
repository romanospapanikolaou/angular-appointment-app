import { Component, HostListener, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  newAppointmentLocation: string = '';
  appointments: Appointment[] = [];

  ngOnInit(): void {
    const savedAppointments = localStorage.getItem('appointments');
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment(): void {
    if (this.newAppointmentTitle.trim() && this.newAppointmentDate) {
      // Truncate the description and location to 40 characters
      const truncatedDescription = this.newAppointmentTitle.substring(0, 30);
      const truncatedLocation = this.newAppointmentLocation.substring(0, 20);

      const newAppointment: Appointment = {
        id: Date.now(),
        title: truncatedDescription,
        date: this.newAppointmentDate,
        location: truncatedLocation || '',
      };
      this.appointments.push(newAppointment);
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();
      this.newAppointmentLocation = '';

      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number): void {
    this.appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const focusedElement = document.activeElement;
    const isInputField =
      focusedElement instanceof HTMLInputElement ||
      focusedElement instanceof HTMLTextAreaElement;

    if (
      event.key === 'Backspace' &&
      !isInputField &&
      this.appointments.length > 0
    ) {
      this.appointments.pop();
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }
  clearAppointments(): void {
    this.appointments = [];
    localStorage.removeItem('appointments');
  }
}
