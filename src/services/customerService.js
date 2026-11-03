import { supabase } from '../lib/supabaseClient'

function avatarFallback(name) {
  const customerName = encodeURIComponent(name || 'Customer')

  return `https://ui-avatars.com/api/?name=${customerName}&background=0176d3&color=ffffff`
}

function toLocalDateTime(value) {
  if (!value) return ''

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return ''

  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )

  return localDate.toISOString().slice(0, 16)
}

function toIsoDateTime(value) {
  if (!value) return null

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? null
    : date.toISOString()
}

function databaseToCustomer(row) {
  return {
    id: row.id,
    avatar:
      row.avatar_path ||
      avatarFallback(row.full_name),

    fullName: row.full_name,
    icNumber: row.ic_number,
    phone: row.phone,
    address: row.address,
    email: row.email || '',
    gender: row.gender || '',
    race: row.race || '',

    applicationId: row.application_id,
    amount: Number(row.amount || 0),
    applyDate: row.apply_date || '',
    endDate: row.end_date || '',
    timesheetDateTime: toLocalDateTime(
      row.timesheet_date_time
    ),
    status: row.status,

    bankDetails: {
      fullName: row.bank_full_name || '',
      accountNo: row.bank_account_no || '',
      bankName: row.bank_name || '',
    },

    reference: {
      relationship:
        row.reference_relationship || '',
      fullName:
        row.reference_full_name || '',
      phone:
        row.reference_phone || '',
      gender:
        row.reference_gender || '',
    },
  }
}

function customerToDatabase(customer) {
  const safeAvatar =
    typeof customer.avatar === 'string' &&
    !customer.avatar.startsWith('data:')
      ? customer.avatar
      : null

  return {
    avatar_path: safeAvatar,

    full_name: customer.fullName.trim(),
    ic_number: customer.icNumber.trim(),
    phone: customer.phone.trim(),
    address: customer.address.trim(),
    email: customer.email?.trim() || null,
    gender: customer.gender || null,
    race: customer.race || null,

    application_id:
      customer.applicationId.trim(),
    amount: Number(customer.amount || 0),
    apply_date: customer.applyDate || null,
    end_date: customer.endDate || null,
    timesheet_date_time: toIsoDateTime(
      customer.timesheetDateTime
    ),
    status:
      customer.status || 'Dalam Semakan',

    bank_full_name:
      customer.bankDetails?.fullName?.trim() ||
      null,
    bank_account_no:
      customer.bankDetails?.accountNo?.trim() ||
      null,
    bank_name:
      customer.bankDetails?.bankName || null,

    reference_relationship:
      customer.reference?.relationship || null,
    reference_full_name:
      customer.reference?.fullName?.trim() ||
      null,
    reference_phone:
      customer.reference?.phone?.trim() ||
      null,
    reference_gender:
      customer.reference?.gender || null,
  }
}

export async function fetchCustomers() {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', {
      ascending: false,
    })

  if (error) throw error

  return (data || []).map(databaseToCustomer)
}

export async function createCustomerRecord(
  customer
) {
  const { data, error } = await supabase
    .from('customers')
    .insert(customerToDatabase(customer))
    .select()
    .single()

  if (error) throw error

  return databaseToCustomer(data)
}

export async function updateCustomerRecord(
  customer
) {
  if (!customer.id) {
    throw new Error(
      'Customer ID tidak dijumpai.'
    )
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error(
      'Sesi pentadbir tidak sah.'
    )
  }

  const updateData = {
    ...customerToDatabase(customer),
    updated_by: user.id,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('customers')
    .update(updateData)
    .eq('id', customer.id)
    .select()
    .single()

  if (error) throw error

  return databaseToCustomer(data)
}

export async function deleteCustomerRecord(
  customerId
) {
  if (!customerId) {
    throw new Error(
      'Customer ID tidak dijumpai.'
    )
  }

  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', customerId)

  if (error) throw error
}